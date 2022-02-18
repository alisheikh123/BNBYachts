import { SignUpComponent } from './../../../pages/auth/sign-up/sign-up.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../../core/mock/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutService } from '../../../core/utils';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  roleName : string = "USER"
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' },{ title: 'Log out', }]

  constructor(private sidebarService: NbSidebarService,
              private authService : AuthService,
              private menuService: NbMenuService,
              private modalService : NgbModal,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {

  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    // this.userService.getBoatUsers(this.roleName)
    //   .subscribe((users: any) => 
    //   this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
      this.menuService.onItemClick().subscribe(( event ) => {
        this.onItemSelection(event.item.title);
      })
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }
  onItemSelection(title) {
    if ( title === 'Log out' ) {
      debugger;
       this.authService.logout();
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      console.log('Profile Clicked ')
    }
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  logout(){
    this.authService.logout;
  }
  signUp() {
    let modalRef = this.modalService.open(SignUpComponent, { windowClass: 'custom-modal custom-large-modal' , centered:true});
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
