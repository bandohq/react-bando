import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import './App.css';
import { Magic } from "magic-sdk"

type MagicContextType = {
  magic: Magic | null
}

const MagicContext = createContext<MagicContextType>({
  magic: null,
})

export const useMagic = () => useContext(MagicContext)

function App() {
  const [magic, setMagic] = useState<Magic | null>(null)
  useEffect(() => {
    const magic = new Magic("pk_live_4997CCD632B0BDF5" || "", {
      network: {
        rpcUrl: "https://rpc2.sepolia.org/",
        chainId: 11155111,
      },
    })
    setMagic(magic)
  }, [])

  // Assumes you've initialized a `Magic` instance with a Dedicated Wallet API Key
  const login = async (emailAddress: any, showUI: any) => {
    try {
      if (magic) {
        const did = await magic.auth.loginWithEmailOTP({ email: emailAddress, showUI: showUI});
        console.log(`DID Token: ${did}`);
        const userInfo = await magic.user.getInfo();
        console.log(`UserInfo: ${userInfo.email}`);
      }
      // Handle user information as needed
    } catch {
      // Handle errors if required!
    }
  }
  return (
    <div className="App">
      <div  data-animation="default" data-collapse="none" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-3 w-nav">
        <div className="container w-container">
          <a href="#" className="brand w-nav-brand"><img src="images/bando_full_green.png" loading="lazy" alt="" className="image-2" /></a>
          <nav role="navigation" className="w-nav-menu">
            <a href="#" className="button w-button" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => login("guayabas@bando.cool", true)}>Empieza Hoy</a>
          </nav>
        </div>
      </div>
      <div className="div-block-7">
        <img src="images/Background.png" loading="lazy" sizes="100vw"  alt="" className="image" />
        <section  className="section">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="div-block-5">
              <p className="paragraph">control, Seguridad y simpleza</p><img src="images/Model-Tank.png" loading="lazy" alt="" className="image-5" /><img src="images/Model-Cone.png" loading="lazy" alt="" className="image-4" /><img src="images/Model-Sphere.png" loading="lazy" alt="" className="image-7 /" /><img src="images/Vector-2.png" loading="lazy" alt="" className="image-8" /><img src="images/2D-Shape.png" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 200px, 250px" alt="" className="image-6" />
              <h1 className="heading">TU PORTAL SEGURO, SENCILLO Y ENTENDIBLE EN LA WEB3<br /></h1>
              <p className="paragraph-3">Bando es tu cuenta de custodia propia para acceder a todo el potencial de web3. Tus llaves, tus criptos, con integración directa a DeFi y bajos costos de transacción<br /></p>
              <a href="#email-2" className="button w-button">Empieza Hoy</a>
            </div>
          </div>
        </section>
        <section  className="section hidden">
          <div className="w-layout-blockcontainer container-7 w-container">
            <div className="div-block horizontal">
              <h1 className="heading-2">Controla tus critpos y explora la web3 con seguridad</h1>
              <p className="paragraph-4 hidden">Bando es tu puerta a la web3 como debe ser: tus llaves, tu cripto, con bajos costos de transacción y con la conexión a DeFi que buscas.</p>
            </div>
          </div>
        </section>
        <section  className="section white">
          <div className="w-layout-blockcontainer container-4 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2">
                <h1 className="h3">Deposita con pesos, <br />obtén cripto</h1>
                <p className="paragraph-5">Deposita con pesos o tu moneda local, y obtén criptomonedas directamente en tu wallet</p>
              </div>
              <div className="div-block-3 spacing"><img src="images/Model-Sphere.png" loading="lazy" alt="" className="image-68" /><img src="images/Vector-10.png" loading="lazy" alt="" className="image-69" /><img src="images/ezgif-2-8ea0987634.gif" loading="lazy" width="250" alt="" /></div>
            </div>
          </div>
        </section>
        <section  className="section first">
          <div className="w-layout-blockcontainer container-6 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2">
                <h1 className="h3">Pon a trabajar tus criptos por ti</h1>
                <p className="paragraph-5">Obtén los rendimientos que esta industria tiene disponibles hoy</p>
              </div>
              <div className="div-block-3">
                <div className="frame-12738">
                  <div className="frame-12743">
                    <div className="frame-12742">
                      <div className="text-3">Ethereum</div>
                      <div className="text-4">3.8%</div>
                    </div><img src="images/image-58.png" loading="lazy" width="82.63195037841797" height="82.21484375" alt="" className="image-58" />
                  </div>
                  <div className="frame-12743">
                    <div className="frame-12742">
                      <div className="text-3">USDC</div>
                      <div className="text-4">3.2%</div>
                    </div><img src="images/image-58_1.png" loading="lazy" width="82.63195037841797" height="82.21484375" alt="" className="image-58" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section  className="section white">
          <div className="w-layout-blockcontainer container-5 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2 centered">
                <h1 className="h3">Accede a más de 800 criptomonedas</h1>
                <p className="paragraph-5">Adquiere Ether, USDC y todas las criptos disponibles en el ecosistema con los mejores precios de la industria</p>
                <div className="frame-12739"><img src="images/Ellipse-2070.png" loading="lazy" width="42.603515625" height="42.603515625" alt="" className="ellipse-2070" /><img src="images/Ellipse-2071.png" loading="lazy" width="42.603515625" height="42.603515625" alt="" className="ellipse-2070" /><img src="images/BITCOIN-WRAPPED.png" loading="lazy" width="42.603515625" height="42.603515625" alt="" className="ellipse-2070" /><img src="images/Ellipse-2069.png" loading="lazy" width="42.603515625" height="42.603515625" alt="" className="ellipse-2070" /><img src="images/shiba.webp" loading="lazy" width="42.603515625" height="42.603515625" alt="" className="ellipse-2070" /></div>
              </div>
              <div className="div-block-3 spacing"><img src="images/Model-Cone.png" loading="lazy" alt="" className="image-68" /><img src="images/Vector-10.png" loading="lazy" alt="" className="image-69" /><img src="images/Swap.png" loading="lazy" width="250" alt="" className="image-59" /></div>
            </div>
          </div>
        </section>
        <section className="menu-2">
          <div className="frame-12745"><img src="images/Vector.png" loading="lazy" width="373.5115051269531" height="262.5644226074219" alt="" className="vectors-wrapper-3" />
            <div className="como-funciona">
              <div className="text-8">¿Cómo funciona?</div>
            </div>
            <div className="c-mo-hacerlo">
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">1. Wallet de custodia propia sin riesgo a perder acceso a tus activos</div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">Si pierdes acceso a tu wallet, Bando te ayudará a obtenerlo de nuevo gracias a nuestra tecnología, Bando NUNCA tiene control de tu wallet o de tus activos</div><img src="images/Safe.png" loading="lazy" sizes="120px" alt="" className="image-71" />
                </div>
              </div>
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">2. Transacciona con las comisiones más baratas</div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">Integración directa con capas 2 para que tengas la más alta velocidad en tus transacciones, al menor costo</div>
                  <div className="frame-12747"><img src="images/image-61.png" loading="lazy" width="61.642578125" height="61.642578125" alt="" className="image-65" /><img src="images/image-60.png" loading="lazy" width="61.602474212646484" height="61.642578125" alt="" className="image-64" /><img src="images/Base.jpeg" loading="lazy" sizes="50px" alt="" className="image-72" /><img src="images/WhatsApp-Image-2023-08-28-at-19.51.31.jpeg" loading="lazy" sizes="50px" alt="" className="image-73" /></div>
                </div>
              </div>
              <img src="images/Model-Cone.png" loading="lazy" alt="" className="image-70" />
              <div className="punto-1">
                <div className="wallet">
                  <div className="title no-margin">3. Accede a las mejores oportunidades en la web3</div>
                  <div className="error-c53ab069-2c51-c73c-3405-774b31ae58bf">Conexión directa con los mejores protocolos descentralizados para que compres, vendas, pidas préstamos y pongas a tus activos a trabajar</div>
                  <div className="frame-12747"><img src="images/image-60_1.png" loading="lazy" width="61.602474212646484" height="61.642578125" alt="" className="image-64" /><img src="images/image-61_1.png" loading="lazy" width="61.642578125" height="61.642578125" alt="" className="image-66" /><img src="images/image-62.png" loading="lazy" width="61.642578125" height="61.642578125" alt="" className="image-67" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="w-layout-blockcontainer container-8 w-container">
            <div className="div-block horizontal">
              <div className="div-block-2 no-margin">
                <h1 className="h3">Conoce al equipo</h1>
                <p className="paragraph-5">Nuestro equipo está formado por personas apasionadas y con experiencia en la industria cripto desde 2016. Tenemos un gran compromiso por transformar la manera en que las personas controlan y son dueñxs de sus finanzas. </p>
              </div>
              <div className="div-block-4">
                <div ><img src="images/Abraham-Cobos.jpeg" loading="lazy"  sizes="(max-width: 479px) 100vw, (max-width: 767px) 35vw, (max-width: 991px) 22vw, 200px" alt="" className="image-3" />
                  <h1  className="heading-3">Abraham Cobos</h1>
                  <p className="paragraph-5 left center-mobile">Co-founder: Producto</p>
                  <div className="div-block-9">
                    <a href="https://www.linkedin.com/in/abrahamcobos/" target="_blank" className="w-inline-block"><img src="images/Vector_1.png" loading="lazy" alt="" className="image-74" /></a>
                    <a href="https://twitter.com/abrahamcr" target="_blank" className="w-inline-block"><img src="images/Vector-1.png" loading="lazy" alt="" className="image-75" /></a>
                  </div>
                </div>
                <div ><img src="images/Luis-Gabriel.jpeg" loading="lazy"  alt="" className="image-3" />
                  <h1  className="heading-3">Luis Gabriel</h1>
                  <p className="paragraph-5 left center-mobile">Co-founder: Tech</p>
                  <div className="div-block-9">
                    <a href="https://www.linkedin.com/in/luis-gabriel-bb154691/" target="_blank" className="w-inline-block"><img src="images/Vector_1.png" loading="lazy" alt="" className="image-74" /></a>
                  </div>
                </div>
                <div><img src="images/Eduardo-Rios.jpeg" loading="lazy" id="w-node-ea006ffe-c4d0-b3e8-9838-096c833caa3a-bee46153" sizes="(max-width: 479px) 100vw, (max-width: 767px) 35vw, (max-width: 991px) 22vw, 200px" alt="" className="image-3" />
                  <h1 className="heading-3">Eduardo Rios</h1>
                  <p className="paragraph-5 left center-mobile">Co-founder: Partnerships</p>
                  <div className="div-block-9">
                    <a href="https://www.linkedin.com/in/eduardo-g-ba5569198/" target="_blank" className="w-inline-block"><img src="images/Vector_1.png" loading="lazy" alt="" className="image-74" /></a>
                    <a href="https://twitter.com/Lalocripto" target="_blank" className="w-inline-block"><img src="images/Vector-1.png" loading="lazy" alt="" className="image-75" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section id="registro"  className="registro">
        <div className="frame-12717">
          <div className="frame-12716">
            <div className="gana-acceso">Obtén acceso</div>
            <div className="text-white">Bando es tu puerta a la web 3 como debe ser: tus llaves, tus criptomonedas; con bajos costos de transacción y con las opciones que buscas para tener todo el control sobre tus activos</div>
          </div>
          <div className="div-block-8">
            <div className="launchlist-form w-form">
              <form id="wf-form-Registration-Form" name="wf-form-Registration-Form" data-name="Registration Form" action="https://getlaunchlist.com/s/rQOS2W" method="post" className="mintear" data-wf-page-id="64e4baed2d1e0cb4bee46153" data-wf-element-id="1d4c628a-a01f-4038-64b2-4c19ea52c521">
                <div className="title">Únete a la lista de espera...</div>
                <div className="subtitle">Déjanos tu correo y te contactaremos cuando puedas probar Bando</div>
                <div className="div-block-6"><label className="text-6">Email</label><input type="email" className="input w-input" name="email" data-name="email" placeholder="" id="email-2" /></div>
                <div className="div-block-6"><label className="text-6">Dirección de tu wallet (opcional)</label><input type="text" className="input w-input" name="address" data-name="address" placeholder="" id="address" /></div>
                <div className="w-embed">
                  <div className="g-recaptcha" data-sitekey="6LcULg0oAAAAAGl97kylxFtWx0yE60jusgSNoT8k" data-callback="enableBtn"></div>
                </div><input type="submit" value="Empieza hoy" data-wait="Please wait..." id="waitlistSubmit" className="button-submission w-button" />
              </form>
              <div className="success-message-2 w-form-done">
                <div className="title">Muchas gracias por registrarte. Te notificaremos a tu mail cuando hayan novedades.</div>
              </div>
              <div className="error-message w-form-fail">
                <div className="title error">¡Ups! Ocurrio un problema al enviar el formulario. Intentalo de nuevo.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer">
        <div className="frame-12718">
          <a href="https://twitter.com/hiro_cool_" className="button-2 w-button">TWITTER</a>
          <a href="mailto:ab@hiro.cool" className="button-2 w-button">Contacto: ab@hiro.cool</a>
        </div>
      </section>
    </div>
  );
}

export default App;
