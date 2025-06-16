import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.j@example.com",
    "role": "Software Engineer"
  },
  {
    "id": 2,
    "name": "Bob Williams",
    "email": "bob.w@example.com",
    "role": "ADMIN"
  },
  {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie.b@example.com",
    "role": "INTERN"
  },
  {
    "id": 4,
    "name": "Diana Miller",
    "email": "diana.m@example.com",
    "role": "INTERN"
  },
  {
    "id": 5,
    "name": "Eve Davis",
    "email": "eve.d@example.com",
    "role": "ENGINEER"
  }
];
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const usersByRole = this.users.filter(user => user.role.toUpperCase() === role.toUpperCase());
            if (usersByRole.length === 0) {
                throw new NotFoundException(`No users found with role ${role}`);
            }
            return usersByRole;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    create(user: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        if (removedUser) {
            this.users = this.users.filter(user => user.id !== id);
            return removedUser;
        }
        return null;
    }
}
