import Grid from '@mui/material/Unstable_Grid2';

import Navbar from '@components/Navbar';
import { styled } from '@mui/material/styles';

import Jumbotron, { GridBox } from '@components/Jumbotron';
import MobileJumbotron from '@components/Jumbotron/mobile';
import Footer from '@components/Footer';
import { PropsWithChildren } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const Container = styled('section')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  height: 'auto',
  minHeight: '100vh',
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  justifySelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  paddingBottom: '84px',
  '& .MuiGrid2-container': { width: '100%' },
  [theme.breakpoints.down('md')]: {
    minHeight: '77vh',
    paddingBottom: '0',
  },
}));

export default function LandingLayout({ children }: Readonly<PropsWithChildren>) {
  const { t } = useTranslation('landing');

  return (
    <div className="App">
      <Navbar />
      <div className="landing-page">
        <section>
          <Grid container spacing={0}>
            <Grid xs={12} sx={{ display: { md: 'none', lg: 'none', sm: 'block', xs: 'block' } }}>
              <MobileJumbotron />
            </Grid>
          </Grid>
        </section>
        <Container>
          <Grid container spacing={0}>
            <Grid
              md={7}
              xs={12}
              sx={{ display: { md: 'block', lg: 'block', sm: 'none', xs: 'none' } }}
            >
              <Jumbotron />
            </Grid>
            <Grid
              md={5}
              xs={12}
              sx={{ marginTop: { xs: '55px', md: 'auto' }, padding: { xs: '15px' } }}
            >
              <GridBox>{children}</GridBox>
            </Grid>
          </Grid>
        </Container>
        <section className="section">
          <Grid
            container
            spacing={0}
            margin="auto"
            alignItems="center"
            sx={(theme) => ({ maxWidth: theme.breakpoints.values.lg })}
          >
            <Grid
              md={6}
              xs={12}
              sx={{
                display: { md: 'block', lg: 'block', sm: 'block', xs: 'block' },
                padding: { md: '0 6rem 0 1rem', lg: '0 6rem 0 0', sm: '0', xs: '0' },
                textAlign: { md: 'left', xs: 'center' },
                marginTop: { md: 0, xs: '2rem' },
              }}
            >
              <h1 className="h3">
                <Trans t={t} i18nKey="video.title" components={{ separator: <br /> }} />
              </h1>
              <p className="paragraph-5">
                <Trans t={t} i18nKey="video.subtitle" components={{ separator: <br /> }} />
              </p>
            </Grid>
            <Grid
              md={6}
              xs={12}
              sx={{ marginTop: { xs: '55px', md: 'auto' }, padding: { xs: '15px' } }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/qe-AxuZ93eE?si=Rve00R3_vHJgJGhG"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Grid>
          </Grid>
        </section>
        <section className="section white">
          <div className="w-layout-blockcontainer container-4 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2">
                <h1 className="h3">
                  <Trans t={t} i18nKey="section2.title" components={{ separator: <br /> }} />
                </h1>
                <p className="paragraph-5">{t('section2.info')}</p>
              </div>
              <div className="div-block-3 spacing">
                <img src="images/Model-Sphere.png" loading="lazy" alt="" className="image-68" />
                <img src="images/Vector-10.png" loading="lazy" alt="" className="image-69" />
                <img src="images/ramp.gif" loading="lazy" width="250" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="section first">
          <div className="w-layout-blockcontainer container-6 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2">
                <h1 className="h3">{t('section3.title')}</h1>
                <p className="paragraph-5">{t('section3.info')}</p>
              </div>
              <div className="div-block-3">
                <div className="frame-12738">
                  <div className="frame-12743">
                    <div className="frame-12742">
                      <div className="text-3">
                        <Trans
                          t={t}
                          i18nKey="coins.eth.title"
                          components={{
                            span: <span style={{ textTransform: 'lowercase', fontSize: '22px' }} />,
                          }}
                        />
                      </div>
                      <div className="text-4">{t('coins.eth.amount')}</div>
                    </div>
                    <img
                      src="images/steth-steth-logo.png"
                      loading="lazy"
                      width="82.63195037841797"
                      height="82.21484375"
                      alt=""
                      className="steth"
                    />
                  </div>
                  <div className="frame-12743">
                    <div className="frame-12742">
                      <div className="text-3">{t('coins.usdm.title')}</div>
                      <div className="text-4">{t('coins.usdm.amount')}</div>
                    </div>
                    <img
                      src="images/USDM.png"
                      loading="lazy"
                      width="82.63195037841797"
                      height="82.21484375"
                      alt=""
                      className="image-58"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section white">
          <div className="w-layout-blockcontainer container-5 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2 centered">
                <h1 className="h3">{t('section4.title')}</h1>
                <p className="paragraph-5">{t('section4.info')}</p>
                <h4 style={{ color: 'var(--40b494)', fontWeight: 'bold' }}>{t('section4.cta')}</h4>
                <div className="frame-12739">
                  <img
                    src="images/Ellipse-2070.png"
                    loading="lazy"
                    width="42.603515625"
                    height="42.603515625"
                    alt=""
                    className="ellipse-2070"
                  />
                  <img
                    src="images/Ellipse-2071.png"
                    loading="lazy"
                    width="42.603515625"
                    height="42.603515625"
                    alt=""
                    className="ellipse-2070"
                  />
                  <img
                    src="images/BITCOIN-WRAPPED.png"
                    loading="lazy"
                    width="42.603515625"
                    height="42.603515625"
                    alt=""
                    className="ellipse-2070"
                  />
                  <img
                    src="images/Ellipse-2069.png"
                    loading="lazy"
                    width="42.603515625"
                    height="42.603515625"
                    alt=""
                    className="ellipse-2070"
                  />
                  <img
                    src="images/shiba.webp"
                    loading="lazy"
                    width="42.603515625"
                    height="42.603515625"
                    alt=""
                    className="ellipse-2070"
                  />
                </div>
              </div>
              <div className="div-block-3 spacing">
                <img src="images/Model-Cone.png" loading="lazy" alt="" className="image-68" />
                <img src="images/Vector-10.png" loading="lazy" alt="" className="image-69" />
                <img
                  src="images/bandoSwap.png"
                  loading="lazy"
                  width="250"
                  alt=""
                  className="image-59"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="menu-2">
          <div className="frame-12745">
            <img
              src="images/Vector.png"
              loading="lazy"
              width="373.5115051269531"
              height="262.5644226074219"
              alt=""
              className="vectors-wrapper-3"
            />
            <div className="como-funciona">
              <div className="text-8">{t('section5.title')}</div>
            </div>
            <div className="c-mo-hacerlo">
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">{t('section5.list.point1.title')}</div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">
                    {t('section5.list.point1.info')}
                  </div>
                  <img
                    src="images/Safe.png"
                    loading="lazy"
                    sizes="120px"
                    alt=""
                    className="image-71"
                  />
                </div>
              </div>
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">{t('section5.list.point2.title')}</div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">
                    {t('section5.list.point2.info')}
                  </div>
                  <div className="frame-12747">
                    <img
                      src="images/image-61.png"
                      loading="lazy"
                      width="61.642578125"
                      height="61.642578125"
                      alt=""
                      className="image-65"
                    />
                    <img
                      src="images/image-60.png"
                      loading="lazy"
                      width="61.602474212646484"
                      height="61.642578125"
                      alt=""
                      className="image-64"
                    />
                    <img
                      src="images/Base.jpeg"
                      loading="lazy"
                      sizes="50px"
                      alt=""
                      className="image-72"
                    />
                    <img
                      src="images/WhatsApp-Image-2023-08-28-at-19.51.31.jpeg"
                      loading="lazy"
                      sizes="50px"
                      alt=""
                      className="image-73"
                    />
                  </div>
                </div>
              </div>
              <img src="images/Model-Cone.png" loading="lazy" alt="" className="image-70" />
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">{t('section5.list.point3.title')}</div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">
                    {t('section5.list.point3.info')}
                  </div>
                  <div className="frame-12747">
                    <img
                      src="images/image-60_1.png"
                      loading="lazy"
                      width="61.602474212646484"
                      height="61.642578125"
                      alt=""
                      className="image-64"
                    />
                    <img
                      src="images/image-61_1.png"
                      loading="lazy"
                      width="61.642578125"
                      height="61.642578125"
                      alt=""
                      className="image-66"
                    />
                    <img
                      src="images/image-62.png"
                      loading="lazy"
                      width="61.642578125"
                      height="61.642578125"
                      alt=""
                      className="image-67"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
