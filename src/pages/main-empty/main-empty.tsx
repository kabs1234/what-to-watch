import Footer from '../../components/footer/footer';
import { PromoFilm } from '../../components/promo-film/promo-film';
import Sprites from '../../components/sprites/sprites';
import { AppRoute } from '../../const';

export default function MainEmpty(): JSX.Element {
  return (
    <>
      <Sprites />
      {<PromoFilm />}
      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <p>Sorry, we have error loading films</p>
          <a href={AppRoute.Main} style={{ color: '#c9b37e' }}>
            Reload page
          </a>
        </section>
        <Footer />
      </div>
    </>
  );
}
