import { NgModule } from '@angular/core';
import{ Routes, RouterModule} from '@angular/router'
import { SearchComponent } from '../components/search/search.component';
import { DetailComponent } from '../components/detail/detail.component';

const routes: Routes =[
  {path: '', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'detail', component: DetailComponent},
  {path: '**', component: SearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
