<?php

$modelsDir = __DIR__.'/app/Models/';
$traitsDir = __DIR__.'/app/Traits/';
$repositoriesDir = __DIR__.'/app/Repositories/';
$servicesDir = __DIR__.'/app/Services/';

if (! is_dir($traitsDir)) {
    mkdir($traitsDir, 0777, true);
}
if (! is_dir($repositoriesDir)) {
    mkdir($repositoriesDir, 0777, true);
}
if (! is_dir($servicesDir)) {
    mkdir($servicesDir, 0777, true);
}

// 1. TenantScope Trait
$tenantScopeContent = <<<EOT
<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait TenantScope
{
    protected static function bootTenantScope()
    {
        if (auth()->check() && session()->has('organization_id')) {
            static::addGlobalScope('organization', function (Builder \$builder) {
                \$builder->where('organization_id', session('organization_id'));
            });
        }
    }
}
EOT;
file_put_contents($traitsDir.'TenantScope.php', $tenantScopeContent);

// 2. User Model
$userModelContent = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasUuids, HasRoles;

    protected \$fillable = [
        'name',
        'email',
        'password',
    ];

    protected \$hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function organizations()
    {
        return \$this->belongsToMany(Organization::class)->withPivot('role');
    }
}
EOT;
file_put_contents($modelsDir.'User.php', $userModelContent);

// 3. Organization Model
$organizationModelContent = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Organization extends Model
{
    use HasFactory, HasUuids;

    protected \$fillable = ['name', 'slug', 'subscription_status', 'settings'];
    
    protected \$casts = [
        'settings' => 'array',
    ];

    public function users()
    {
        return \$this->belongsToMany(User::class)->withPivot('role');
    }
}
EOT;
file_put_contents($modelsDir.'Organization.php', $organizationModelContent);

// 4. Ticket Model
$ticketModelContent = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Traits\TenantScope;

class Ticket extends Model
{
    use HasFactory, HasUuids, TenantScope;

    protected \$fillable = ['organization_id', 'source', 'voice_recording_url'];

    public function calls()
    {
        return \$this->hasMany(Call::class);
    }
    
    public function activities()
    {
        return \$this->hasMany(TicketActivity::class);
    }
}
EOT;
file_put_contents($modelsDir.'Ticket.php', $ticketModelContent);

// 5. Call Model
$callModelContent = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Traits\TenantScope;

class Call extends Model
{
    use HasFactory, HasUuids, TenantScope;

    protected \$fillable = ['organization_id', 'ticket_id', 'recording_path', 'duration', 'sid'];

    public function ticket()
    {
        return \$this->belongsTo(Ticket::class);
    }
}
EOT;
file_put_contents($modelsDir.'Call.php', $callModelContent);

// 6. SopTask Model
$sopTaskModelContent = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Traits\TenantScope;

class SopTask extends Model
{
    use HasFactory, HasUuids, TenantScope;

    protected \$fillable = ['organization_id', 'title', 'is_completed'];
}
EOT;
file_put_contents($modelsDir.'SopTask.php', $sopTaskModelContent);

// 7. TicketActivity Model
$ticketActivityModelContent = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Traits\TenantScope;

class TicketActivity extends Model
{
    use HasFactory, HasUuids, TenantScope;

    protected \$fillable = ['organization_id', 'ticket_id', 'activity'];
    
    public function ticket()
    {
        return \$this->belongsTo(Ticket::class);
    }
}
EOT;
file_put_contents($modelsDir.'TicketActivity.php', $ticketActivityModelContent);

// 8. Repository Interface
$repositoryInterfaceContent = <<<EOT
<?php

namespace App\Repositories;

use App\Models\Ticket;

interface TicketRepositoryInterface
{
    public function createForOrganization(string \$organizationId, array \$data): Ticket;
    public function assignToMember(string \$ticketId, string \$memberId): bool;
    public function getAnalytics(string \$organizationId): array;
}
EOT;
file_put_contents($repositoriesDir.'TicketRepositoryInterface.php', $repositoryInterfaceContent);

// 9. Repository Implementation
$repositoryContent = <<<EOT
<?php

namespace App\Repositories;

use App\Models\Ticket;

class TicketRepository implements TicketRepositoryInterface
{
    public function createForOrganization(string \$organizationId, array \$data): Ticket
    {
        return Ticket::create(array_merge(['organization_id' => \$organizationId], \$data));
    }

    public function assignToMember(string \$ticketId, string \$memberId): bool
    {
        // Implementation
        return true;
    }

    public function getAnalytics(string \$organizationId): array
    {
        return [
            'total' => Ticket::where('organization_id', \$organizationId)->count(),
        ];
    }
}
EOT;
file_put_contents($repositoriesDir.'TicketRepository.php', $repositoryContent);

// 10. Service
$serviceContent = <<<EOT
<?php

namespace App\Services;

use App\Repositories\TicketRepositoryInterface;
use App\Models\Ticket;

class TicketService
{
    protected \$repository;

    public function __construct(TicketRepositoryInterface \$repository)
    {
        \$this->repository = \$repository;
    }

    public function createTicket(string \$organizationId, array \$data): Ticket
    {
        // Business logic (e.g. "When a ticket is created, send a Slack alert and assign a Member")
        \$ticket = \$this->repository->createForOrganization(\$organizationId, \$data);
        
        // Example Slack Alert Logic
        // ...
        
        return \$ticket;
    }
}
EOT;
file_put_contents($servicesDir.'TicketService.php', $serviceContent);

// 11. Widget API Controller
$apiControllerDir = __DIR__.'/app/Http/Controllers/Api/';
if (! is_dir($apiControllerDir)) {
    mkdir($apiControllerDir, 0777, true);
}

$widgetControllerContent = <<<EOT
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Organization;

class WidgetController extends Controller
{
    public function config(Request \$request)
    {
        \$token = \$request->query('token');
        
        if (!\$token) {
            return response()->json(['error' => 'Token missing'], 400);
        }
        
        // Find organization by token/slug or ID in real scenario. Using slug as token here
        \$organization = Organization::where('slug', \$token)->first();
        
        if (!\$organization) {
            return response()->json(['error' => 'Invalid token'], 404);
        }
        
        return response()->json([
            'widget_settings' => \$organization->settings['widget'] ?? [
                'color' => '#3b82f6',
                'title' => 'Chat with us!',
            ]
        ]);
    }
}
EOT;
file_put_contents($apiControllerDir.'WidgetController.php', $widgetControllerContent);

echo "Scaffold complete.\n";
