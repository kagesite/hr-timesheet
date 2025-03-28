import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../interfaces/department';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Employee } from '../../interfaces/employee';

@Component({
    selector: 'app-timesheet',
    standalone: false,
    templateUrl: './timesheet.component.html',
    styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent implements OnInit {
    departments: Department[] | undefined;
    department: Department | undefined
    employeeNameFC = new FormControl('', this.nameValidator());
    employees: Employee[] = [];
    employeeId = 0
    
    constructor(
        private router: ActivatedRoute,
        private departmentsService: DepartmentsService,
    ) { }

    ngOnInit(): void {
        this.departments = this.departmentsService.departments;
        this.department = this.departments.find(department => department.id === this.router.snapshot.params['id']);
    }

    addEmployee(): void {
        if (this.employeeNameFC.value) {
            this.employeeId++;

            this.employees.push({
                id: this.employeeId.toString(),
                departmentId: this.department?.id,
                name: this.employeeNameFC.value,
                payRate: Math.floor(Math.random() * 50) + 50,
            });

            this.employeeNameFC.setValue('');
        }
    }

    nameValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let error = null;
            if (this.employees && this.employees.length) {
                this.employees.forEach(employee => {
                    if (employee.name.toLowerCase() === control.value.toLowerCase()) {
                        error = {duplicate: true};
                    }
                });
            }
            return error;
        };
    }
    
}
