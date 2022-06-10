import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaService } from '../medias/Services/media.service';
import { MediasComponent } from './medias.component';


describe('Medias component', () => {
    let mediaService: MediaService;
    let page: MediasComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [MediaService]
      });
      page = new MediasComponent(mediaService);
      // inject the service
      mediaService = TestBed.get(MediaService);
    });

    it('Should load Media', () => {
        mediaService.getMedias().subscribe(() => {
        expect(page.medias).toBeGreaterThan(0);
    });

  });

    it('Should Filter Media', () => {
        mediaService.filterMedia('Images').subscribe(() => {
        expect(page.medias).toEqual(1);
    });

  });


});
