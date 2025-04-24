<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    public function getUser(int $userId): User
    {
        return $this->userRepository->get($userId);
    }

    /**
     * @param  array<string, string>|null  $sorts
     * @return array<string, mixed>
     */
    public function getUsers(int $contractId, ?array $sorts, ?int $page, ?int $limit): array
    {
        $criteria = ['contract_id' => $contractId];

        if ($page && $limit) {
            return $this->userRepository->getWithPagination($criteria, $sorts, $page, $limit);
        }

        $users = $this->userRepository->getBy($criteria);

        return [
            'Users' => $users,
            'pagination' => null,
        ];
    }

    public function getUserByEmail(string $email): ?User
    {
        $criteria = ['email' => $email];

        return $this->userRepository->getBy($criteria)->first();
    }

    /**
     * @param  array<string, mixed>  $userData
     */
    public function createUser(array $userData): User
    {
        return $this->userRepository->create($userData);
    }

    /**
     * @param  array<string, mixed>  $userData
     */
    public function updateUser(int $userId, array $userData): User
    {
        return $this->userRepository->update($userId, $userData);
    }

    public function deleteUser(int $userId): void
    {
        $this->userRepository->delete($userId);
    }

    public function login(string $email, string $password): ?User
    {
        $criteria = ['email' => $email];
        $user = $this->userRepository->getBy($criteria)->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }
}
