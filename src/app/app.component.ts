import { Component, OnInit, HostListener, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IndexService } from './index/Services/index.service';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { fadeAnimation } from './animations';
import { environment } from 'src/environments/environment';
import { TokenizeService } from './tokenize.service';
import { SpinnerService } from './core/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild('navbar') navbar;
  title = 'Frontpage';
  public menus: any;
  public featuredNews: any;
  public userLoggedIn = false;
  public userId: any;
  public buttonText: any;
  public navbarOpen = false;
  public topBar = 'block';
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  public language = localStorage.getItem('currentLanguageForDisplay');
  public Welcome: any;
  public contactusInfo: any;
  public ismember = false;
  public ismemberActivated = false;
  public membersOnlyMenu: any;
  public logoText: string;
  public screenWidth: any;
  public currentYear = new Date().getFullYear();
  public env = environment;
  smallLanguage = false;
  public scrolled:boolean = false;
  public smallCurrentLang = localStorage.getItem("currentLanguageForDisplay");
  url: any;
  sending: boolean = false;
  constructor(
    public spinnerService: SpinnerService,
    private indexService: IndexService,
    private router: Router,
    config: NgbPopoverConfig,
    private actRoute?: ActivatedRoute,
    private translate?: TranslateService,
    private cdRef?: ChangeDetectorRef

  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        localStorage.setItem('lastUrl', this.router.url);
      }
    });

    if (!localStorage.getItem('currentLanguage')) {
      localStorage.setItem('currentLanguage', 'English');
      localStorage.setItem('currentLanguageForDisplay', 'English');
    }

    translate.setDefaultLang(localStorage.getItem('currentLanguage'));

    // customize default values of popovers used by this component tree
    config.placement = 'bottom';
    config.triggers = 'click';

    if (window.innerWidth < 1100) {
      this.smallLanguage = true;
    }
    else {
      this.smallLanguage = false;
    }

    this.url = window.location.pathname;
  }

  isEmpety(str: any) {
    if (str === '' || str === null) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {

    this.spinnerService.loadingState$.subscribe(val=>{
      this.sending = val;
      this.cdRef.detectChanges();
    })
    this.ismember = localStorage.getItem('member') === 'True' ? true : false;
    this.ismemberActivated = localStorage.getItem('memberStatus') === 'Activated' ? true : false;
    this.indexService.loadMenu().subscribe((data: any[]) => {
    this.menus = data;
    });

    if (this.ismember) {
      this.indexService.loadMembersOnlyMenu().subscribe((data: any[]) => {
        this.membersOnlyMenu = data;
      });
    }

    this.indexService.loadContact().subscribe((data: any[]) => {
      this.contactusInfo = data;
    });

    if (!this.isEmpety(localStorage.getItem('userId'))) {
      this.Welcome = this.translate.instant('Welcome, ');
      this.buttonText = localStorage.getItem('userFullName');
      this.userLoggedIn = true;
      this.userId = 'index/studentProfile/' + localStorage.getItem('userEmail');
    }
    this.screenWidth = window.innerWidth;
  }

  changeLanguage(language: any) {
    if (language === 1) {
      localStorage.setItem('currentLanguage', 'English');
      localStorage.setItem('currentLanguageForDisplay', 'English');

    }
    if (language === 2) {
      localStorage.setItem('currentLanguage', 'Amharic');
      localStorage.setItem('currentLanguageForDisplay', 'አማርኛ');

    }
    if (language === 3) {
      localStorage.setItem('currentLanguage', 'Oromifa');
      localStorage.setItem('currentLanguageForDisplay', 'Oromifa');

    }
    if (language === 4) {
      localStorage.setItem('currentLanguage', 'Harari');
      localStorage.setItem('currentLanguageForDisplay', 'ሃረሪ');

    }
    window.location.replace(localStorage.getItem('lastUrl'));
  }

  navigateUser(url?: any) {
    this.url = url
    if (url === undefined) {
      this.router.navigateByUrl(this.userId);
    } else {
      if (url === '/members/edit/') {
        this.router.navigateByUrl(url + localStorage.getItem('userEmail'));
      } else {
        this.router.navigateByUrl(url);
      }
    }
    this.navbarOpen ? this.toggleNavbar() : null;
  }

  logout() {
    const confirmation = confirm(
      'Are You Sure You Want to Logging Out the System ?'
    );
    if (confirmation) {
      if (this.clearLocalStorage()) {
        window.location.replace('/index');
      }
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenWidth < 1100 ? this.smallLanguage = true : this.smallLanguage = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const imageIcon = document.getElementsByClassName('img img-circle') as HTMLCollectionOf<HTMLElement>;
    const textLogo = document.getElementsByClassName('navbar-brand logo-text') as HTMLCollectionOf<HTMLElement>;
    const dropdown = document.getElementsByClassName('dropdownMenu') as HTMLCollectionOf<HTMLElement>;
    const  icons = document.getElementsByClassName('icon') as HTMLCollectionOf<HTMLElement>;
      
      for(var i = 0; i < icons.length; i++) {
        icons[i].style.color='black'
      }
      dropdown[0].style.color = 'black'
      dropdown[1].style.color = 'black'
      dropdown[2].style.color = 'black'
      dropdown[3].style.color = 'black'
      dropdown[4].style.color = 'black'
      this.scrolled = false;
    
    if (window.pageYOffset === 0) {
      this.navbar.nativeElement.id = '';
      this.topBar = 'block';
    } else if (window.pageYOffset > 500) {
      this.navbar.nativeElement.id = '';
      this.topBar = 'none';
      this.showScroll = true;
      // navBar[0].style.paddingTop = '30px';
      if (this.screenWidth > 515) {
        imageIcon[0].style.display = 'none';
        textLogo[0].style.display = 'block';
        this.logoText = 'Harari PPDSO';
        dropdown[0].style.background = 'transparent'
        dropdown[0].style.color = 'whitesmoke'
        dropdown[1].style.background = 'transparent'
        dropdown[1].style.color = 'whitesmoke'
        dropdown[2].style.background = 'transparent'
        dropdown[2].style.color = 'whitesmoke'
        dropdown[3].style.background = 'transparent'
        dropdown[3].style.color = 'whitesmoke'
        dropdown[4].style.background = 'transparent'
        dropdown[4].style.color = 'whitesmoke'
        for(var i = 0; i < icons.length; i++) {
          icons[i].style.color='whitesmoke'
        }
        this.navbar.nativeElement.id = 'bg-light';
        this.scrolled = true;
       
      }
    } else if (window.pageYOffset > 0 && window.pageYOffset < 500) {
      this.navbar.nativeElement.id = '';
      this.topBar = 'none';
      this.showScroll = false;
      imageIcon[0].style.display = 'block';
      textLogo[0].style.display = 'none';
      this.logoText = '';

    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  clearLocalStorage() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('member');
    localStorage.removeItem('memberStatus');
    localStorage.removeItem('key');
    this.userLoggedIn = false;
    return true;
  }
}
