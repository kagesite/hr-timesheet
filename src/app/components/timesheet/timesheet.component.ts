import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../interfaces/department';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-timesheet',
    standalone: false,
    templateUrl: './timesheet.component.html',
    styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent implements OnInit {
    departments: Department[] | undefined;
    department: Department | undefined
    employeeNameFC = new FormControl('');
    
    constructor(
        private router: ActivatedRoute,
        private departmentsService: DepartmentsService,
    ) { }

    ngOnInit(): void {
        this.departments = this.departmentsService.departments;
        this.department = this.departments.find(department => department.id === this.router.snapshot.params['id']);
    }
}
