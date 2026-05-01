<?php

namespace App\Services;

use App\Models\Ticket;
use App\Repositories\TicketRepositoryInterface;

class TicketService
{
    protected $repository;

    public function __construct(TicketRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function createTicket(string $organizationId, array $data): Ticket
    {
        // Business logic (e.g. "When a ticket is created, send a Slack alert and assign a Member")
        $ticket = $this->repository->createForOrganization($organizationId, $data);

        // Example Slack Alert Logic
        // ...

        return $ticket;
    }
}
