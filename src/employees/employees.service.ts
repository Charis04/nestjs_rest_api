import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Creates a new employee.
   * @param createEmployeeDto - The data to create a new employee.
   * @returns A message indicating the action.
   */
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return this.databaseService.employee.findMany({
      where: {
        role,
      },
    });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id, },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id, },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id, },
    });
  }
}
