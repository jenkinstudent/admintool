import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'program', loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)  },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)  },
  { path: 'module', loadChildren: () => import('./module/module.module').then(m => m.ModuleModule)  },
  { path: 'quiz', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningactivityRoutingModule { }
