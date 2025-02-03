import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskComponent } from './pages/task/task.component';


export const routes: Routes = [
    {
        "path": "",
        "redirectTo": "login",
        "pathMatch": "full"
    },
    {
        "path": "login",
        "component": LoginComponent,
        "pathMatch": "full"
    },
    {
        "path": "register",
        "component": RegisterComponent,
        "pathMatch": "full"
    },
    {
        "path": "tasks",
        "component": TaskComponent,
        "pathMatch": "full"
    },

];
