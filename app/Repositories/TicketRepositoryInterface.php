<?php

namespace App\Repositories;

use App\Models\Ticket;

interface TicketRepositoryInterface
{
    public function createForOrganization(string $organizationId, array $data): Ticket;

    public function assignToMember(string $ticketId, string $memberId): bool;

    public function getAnalytics(string $organizationId): array;
}
