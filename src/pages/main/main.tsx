import { PromoFilm } from '../../components/promo-film/promo-film';
import Sprites from '../../components/sprites/sprites';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';

export default function Main(): JSX.Element {
  return (
    <div>
      <Sprites />
      {<PromoFilm />}
      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <GenresList />
          <FilmsList />
          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
