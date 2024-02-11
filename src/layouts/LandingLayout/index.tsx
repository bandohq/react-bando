import Grid from '@mui/material/Unstable_Grid2';

import Navbar from '@components/Navbar';
import { styled } from '@mui/material/styles';

import Jumbotron, { GridBox } from '@components/Jumbotron';
import { PropsWithChildren } from 'react';

const Container = styled('section')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  height: 'auto',
  minHeight: '100vh',
  width: '100%',
  maxWidth: theme.breakpoints.values.xl,
  justifySelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  paddingBottom: '84px',
  '& .MuiGrid2-container': { width: '100%' },
}));

export default function LandingLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="App">
      <Navbar />
      <div className="landing-page">
        <Container>
          <Grid container spacing={2}>
            <Grid md={6} xs={12}>
              <Jumbotron />
            </Grid>
            <Grid md={6} xs={12}>
              <GridBox>{children}</GridBox>
            </Grid>
          </Grid>
        </Container>
        <section className="section hidden">
          <div className="w-layout-blockcontainer container-7 w-container">
            <div className="div-block horizontal">
              <h1 className="heading-2">Controla tus criptos y explora con seguridad</h1>
              <p className="paragraph-4 hidden">
                Bando es tu puerta a cripto como debe ser: tus llaves, tus tokens, con bajos costos
                de transacción y con la conexión a DeFi que buscas.
              </p>
            </div>
          </div>
        </section>
        <section className="section white">
          <div className="w-layout-blockcontainer container-4 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2">
                <h1 className="h3">
                  Deposita con pesos, <br />
                  obtén cripto
                </h1>
                <p className="paragraph-5">
                  Deposita con pesos o tu moneda local, y obtén criptomonedas directamente en tu
                  wallet preferida o en tu cuenta inteligente Bando.
                </p>
              </div>
              <div className="div-block-3 spacing">
                <img src="images/Model-Sphere.png" loading="lazy" alt="" className="image-68" />
                <img src="images/Vector-10.png" loading="lazy" alt="" className="image-69" />
                <img src="images/ezgif-2-8ea0987634.gif" loading="lazy" width="250" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="section first">
          <div className="w-layout-blockcontainer container-6 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2">
                <h1 className="h3">Pon a trabajar tus criptos por ti</h1>
                <p className="paragraph-5">
                  Obtén los rendimientos que esta industria tiene disponibles hoy
                </p>
              </div>
              <div className="div-block-3">
                <div className="frame-12738">
                  <div className="frame-12743">
                    <div className="frame-12742">
                      <div className="text-3">ETH</div>
                      <div className="text-4">3.8%</div>
                    </div>
                    <img
                      src="images/image-58.png"
                      loading="lazy"
                      width="82.63195037841797"
                      height="82.21484375"
                      alt=""
                      className="image-58"
                    />
                  </div>
                  <div className="frame-12743">
                    <div className="frame-12742">
                      <div className="text-3">USDC</div>
                      <div className="text-4">3.2%</div>
                    </div>
                    <img
                      src="images/image-58_1.png"
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
                <h1 className="h3">Accede a más de 800 criptomonedas</h1>
                <p className="paragraph-5">
                  Adquiere Ether, USDC y todas las criptos disponibles en el ecosistema con los
                  mejores precios de la industria
                </p>
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
                <img src="images/Swap.png" loading="lazy" width="250" alt="" className="image-59" />
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
              <div className="text-8">Muy Pronto</div>
            </div>
            <div className="c-mo-hacerlo">
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">
                    1. Cuenta inteligente de custodia propia sin riesgo a perder acceso a tus
                    activos
                  </div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">
                    Si pierdes acceso a tu cuenta, Bando te ayudará a obtenerlo de nuevo gracias a
                    nuestra tecnología, Bando NUNCA tiene control de tu cuenta o de tus activos
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
                  <div className="title no-margin">
                    2. Transacciona con las comisiones más baratas
                  </div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">
                    Integración directa con capas 2 para que tengas la más alta velocidad en tus
                    transacciones, al menor costo
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
                  <div className="title no-margin">
                    3. Accede a las mejores oportunidades en cripto
                  </div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">
                    Conexión directa con los mejores protocolos descentralizados para que compres,
                    vendas, pidas préstamos y pongas a tus activos a trabajar
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
      <section className="footer">
        <div className="frame-12718">
          <a href="https://twitter.com/bando_cool_" className="button-2 w-button">
            X
          </a>
          <a href="mailto:ab@hiro.cool" className="button-2 w-button">
            Contacto: hola@bando.cool
          </a>
        </div>
      </section>
    </div>
  );
}
