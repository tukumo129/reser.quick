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

    /**
     * @param int $userId
     * @return User
     */
    public function getUser(int $userId): User
    {
        return $this->userRepository->find($userId);
    }

    /**
     * @param int $contractId
     * @param array<string, string>|null $sorts
     * @param int|null $page
     * @param int|null $limit
     * @return array<string, mixed>
     */
    public function getUsers(int $contractId, ?array $sorts, ?int $page, ?int $limit): array
    {
        $criteria = ['contract_id' => $contractId];

        if($page && $limit) {
            return $this->userRepository->findWithPagination($criteria, $sorts, $page, $limit);
        }

        $users = $this->userRepository->findBy($criteria);
        return [
            'Users' => $users,
            'pagination' => null,
        ];
    }

    /**
     * @param array<string, mixed> $userData
     * @return User
     */
    public function createUser(array $userData): User
    {
        return $this->userRepository->create($userData);
    }

    /**
     * @param int $userId
     * @param array<string, mixed> $userData
     * @return User
     */
    public function updateUser(int $userId, array $userData): User
    {
        return $this->userRepository->update($userId, $userData);
    }

    /**
     * @param int $userId
     * @return void
     */
    public function deleteUser(int $userId): void
    {
        $this->userRepository->delete($userId);
    }

    /**
     * @param string $email
     * @param string $password
     * @return User|null
     */
    public function login(string $email, string $password): ?User
    {
        $criteria = ['email' => $email];
        $user = $this->userRepository->findBy($criteria)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }
        return $user;
    }
}
