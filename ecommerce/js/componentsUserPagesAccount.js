if (sessionStorage.getItem('User')) {
  let ActiveUser = JSON.parse(sessionStorage.getItem('User'))

}

const accountAddress = {
  render: function () {
    return `
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <h4>Dirección de Contacto</h4>
        <hr class="padding-bottom-1x">
        <form class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="account-company">Provincia</label>
                    <select  class="form-control" id="account-province">
                        <option value="" selected="">Seleccione una provincia</option>
                        <option value="B">Buenos Aires</option>
                        <option value="C">Capital Federal</option>
                        <option value="K">Catamarca</option>
                        <option value="H">Chaco</option>
                        <option value="U">Chubut</option>
                        <option value="X">Cordoba</option>
                        <option value="W">Corrientes</option>
                        <option value="E">Entre Rios</option>
                        <option value="P">Formosa</option>
                        <option value="Y">Jujuy</option>
                        <option value="L">La Pampa</option>
                        <option value="F">La Rioja</option>
                        <option value="M">Mendoza</option>
                        <option value="N">Misiones</option>
                        <option value="Q">Neuquen</option>
                        <option value="R">Rio Negro</option>
                        <option value="A">Salta</option>
                        <option value="J">San Juan</option>
                        <option value="D">San Luis</option>
                        <option value="Z">Santa Cruz</option>
                        <option value="S">Santa Fe</option>
                        <option value="G">Santiago Del Estero</option>
                        <option value="V">Tierra del Fuego</option>
                        <option value="T">Tucuman</option>
                    </select>
                </div>
            </div>
             <div class="col-md-6">
                <div class="form-group">
                    <label for="account-city">Ciudad</label>
                    <select class="form-control" id="account-city">
                        <option>Seleccione una Ciudad</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="account-address1">Direccion </label>
                    <input class="form-control" type="text" id="account-address" required=""
                        placeholder="Ingrese solo el Nombre de la Calle">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="account-address2">Altura</label>
                    <input  class="form-control" type="number" id="account-numberStreet" placeholder="Ingrese la altura">
                </div>
            </div>
            <div class="col-md-6" id="viewErrorDirection">
                <div class="form-group">
                    <label for="account-zip">Codigo Postal</label>
                    <input class="form-control" type="text" id="account-zip" required="" disabled="">
                </div>
                <div >
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="account-address2">Telefono Celular</label>
                    <input class="form-control" type="text" id="account-SmartPhone">
                </div>
            </div>

                <div class="text-right">
                  <button id="account-UpdateDirections" class="btn btn-primary margin-bottom-none" type="button" 
                  data-toast="" data-toast-position="topRight" data-toast-type="success" 
                  data-toast-icon="icon-circle-check" data-toast-title="Success!" 
                  data-toast-message="Su dirección se actualizó con éxito." disabled>Verificar Dirección</button> 
                </div>

            <div class="text-right">
                    <button   id="account-Submit" class="btn btn-primary margin-bottom-none" type="button"
                        data-toast="" data-toast-position="topRight" data-toast-type="success"
                        data-toast-icon="icon-circle-check" data-toast-title="Success!"
                        data-toast-message="Su dirección se actualizó con éxito." disabled>Actualizar dirección</button> 
              </div>
              <hr id="viewMessageMap" class="margin-top-2x margin-bottom-2x">

            <div id="mapa" style="width: 800px; height: 350px; display: none;"> </div>
            <div class="col-12 padding-top-1x">
                <h4>Dirección de Envío</h4>
                <hr class="padding-bottom-1x">
                <div class="custom-control custom-checkbox d-block">
                    <input class="custom-control-input" type="checkbox" id="same_address" checked="">
                    <label class="custom-control-label" for="same_address">Misma Dirección de Contacto</label>
                </div>
                <hr class="margin-top-1x margin-bottom-1x">
                
            </div>
        </form>
`
  }
}
const MyOrders = {
  render: function () {
    return `
          <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <div class="table-responsive">
          <table class="table table-hover margin-bottom-none">
            <thead>
              <tr>
                <th>N° Orden</th>
                <th>Fecha de Compra</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a class="text-medium navi-link" href="#" data-toggle="modal" data-target="#orderDetails">78A643CD409</a></td>
                <td>08 de Agosto, 2017</td>
                <td><span class="text-danger">Cancelada</span></td>
                <td><span class="text-medium">$760.50</span></td>
              </tr>
              <tr>
                <td><a class="text-medium navi-link" href="#" data-toggle="modal" data-target="#orderDetails">34VB5540K83</a></td>
                <td>21 de Julio, 2017</td>
                <td><span class="text-info">En Progreso</span></td>
                <td><span class="text-medium">$315.20</span></td>
              </tr>
              <tr>
                <td><a class="text-medium navi-link" href="#" data-toggle="modal" data-target="#orderDetails">112P45A90V2</a></td>
                <td>15 de Junio, 2017</td>
                <td><span class="text-warning">Demorado</span></td>
                <td><span class="text-medium">$1,264.00</span></td>
              </tr>
              <tr>
                <td><a class="text-medium navi-link" href="#" data-toggle="modal" data-target="#orderDetails">28BA67U0981</a></td>
                <td>19 de Mayo, 2017</td>
                <td><span class="text-success">Enviado</span></td>
                <td><span class="text-medium">$198.35</span></td>
              </tr>
              <tr>
                <td><a class="text-medium navi-link" href="#" data-toggle="modal" data-target="#orderDetails">502TR872W2</a></td>
                <td>04 de Abril, 2017</td>
                <td><span class="text-success">Enviado</span></td>
                <td><span class="text-medium">$2,133.90</span></td>
              </tr>
              <tr>
                <td><a class="text-medium navi-link" href="#" data-toggle="modal" data-target="#orderDetails">47H76G09F33</a></td>
                <td>30 de Marzo, 2017</td>
                <td><span class="text-success">Enviado</span></td>
                <td><span class="text-medium">$86.40</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <div class="text-right"><a class="btn btn-link-primary margin-bottom-none" href="#MyOrders"><i class="icon-download"></i>&nbsp;Detalle de pedidos</a></div>
        
    `
  }
}

const MyProfile = {
  render: function () {
    return `
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <form class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="account-fn">Nombre</label>
              <input class="form-control" type="text" id="account-fn" value=" ` + ActiveUser.firstname + `" required="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="account-ln">Apellido</label>
              <input class="form-control" type="text" id="account-ln" value="` + ActiveUser.lastname + `" required="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="account-email">Correo - Usurario</label>
              <input class="form-control" type="email" id="account-email" value="` + ActiveUser.email + `" disabled="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="account-phone">Telefono Particular</label>
              <input class="form-control" type="text" id="account-phone" value="` + ActiveUser.celnumber + `" required="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="account-pass">Nueva Password</label>
              <input class="form-control" type="password" id="account-pass">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="account-confirm-pass">Confirmar Password</label>
              <input class="form-control" type="password" id="account-confirm-pass">
            </div>
          </div>
          <div class="col-12">
            <hr class="mt-2 mb-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="custom-control custom-checkbox d-block">
                <input class="custom-control-input" type="checkbox" id="subscribe_me" checked="">
                <label class="custom-control-label" for="subscribe_me">Suscribirme a Newsletter</label>
              </div>
              <button class="btn btn-primary margin-right-none" type="button" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="icon-circle-check" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Actualizar Informacion</button>
            </div>
          </div>
        </form>
    `
  }
}

const MyWishlist = {
  render: function () {
    return `
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <!-- Wishlist Table-->
        <div class="table-responsive wishlist-table margin-bottom-none">
          <table class="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#">Borrar Todos</a></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="product-item"><a class="product-thumb" href="shop-single.html"><img src="img/shop/cart/01.jpg" alt="Producto"></a>
                    <div class="product-info">
                      <h4 class="product-title"><a href="shop-single.html">Zapatillas Negras</a></h4>
                      <div class="text-lg text-medium text-muted">$43.90</div>
                      <div>Disponible:
                        <div class="d-inline text-success">En Stock</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Eliminar item"><i class="icon-cross"></i></a></td>
              </tr>
              <tr>
                <td>
                  <div class="product-item"><a class="product-thumb" href="shop-single.html"><img src="img/shop/cart/02.jpg" alt="Producto"></a>
                    <div class="product-info">
                      <h4 class="product-title"><a href="shop-single.html">Gorra Negra Fabric </a></h4>
                      <div class="text-lg text-medium text-muted">$24.70</div>
                      <div>Disponible:
                        <div class="d-inline text-warning">2 - 3 Semanas</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Eliminar item"><i class="icon-cross"></i></a></td>
              </tr>
              <tr>
                <td>
                  <div class="product-item"><a class="product-thumb" href="shop-single.html"><img src="img/shop/cart/03.jpg" alt="Producto"></a>
                    <div class="product-info">
                      <h4 class="product-title"><a href="shop-single.html">Cartera Azul</a></h4>
                      <div class="text-lg text-medium text-muted">$200.00</div>
                      <div>Disponible:
                        <div class="d-inline text-success">En Stock</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Eliminar item"><i class="icon-cross"></i></a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="mb-4">
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="inform_me" checked="">
          <label class="custom-control-label" for="inform_me">Informarme cuando el artículo de mi lista de Favoritos esté disponible</label>
        </div>
    `
  }
}

//TODO - Hacer que cada comunicacion tenga un DI univoco que sea el id de la comunicacion
const Comunication = {
  render: function () {
    return `
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <div class="table-responsive">
          <table class="table table-hover margin-bottom-none">
            <thead>
              <tr>
                <th>Asunto</th>
                <th>Fecha de envío | Actualizacion</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a id="1" class="text-medium navi-link"  onclick="reloadComunication(1)">Mi nuevo Ticket</a></td>
                <td>08/08/2017 | 14/08/2017</td>
                <td>Problema en el Sitio Web</td>
                <td><span class="text-warning">Alto</span></td>
                <td><span class="text-primary">Abierto</span></td>
              </tr>
              <tr>
                <td><a id="2" class="text-medium navi-link" onclick="reloadComunication(1)">Consulta</a></td>
                <td>21/07/2017 | 23/07/2017</td>
                <td>Solicitud de Registro</td>
                <td><span class="text-info">Medio</span></td>
                <td><span class="text-muted">Cerrado</span></td>
              </tr>
              <tr>
                <td><a id="3" class="text-medium navi-link" onclick="reloadComunication(1)">Otro Nuevo Ticket</a></td>
                <td>19/05/2017 | 20/05/2017</td>
                <td>Reclamo</td>
                <td><span class="text-danger">Muy Alto</span></td>
                <td><span class="text-muted">Cerrado</span></td>
              </tr>
              <tr>
                <td><a id="4" class="text-medium navi-link" onclick="reloadComunication(1)">Vieja Consulta</a></td>
                <td>19/05/2017 | 20/05/2017</td>
                <td>Info inquiry</td>
                <td><span class="text-success">Baja</span></td>
                <td><span class="text-muted">Cerrado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="mb-4">
        <div class="text-right">
          <button class="btn btn-primary margin-bottom-none" data-toggle="modal" data-target="#openTicket">Enviar Nueva Comunicacion</button>
        </div>
    `
  }
}


const ComunicationActivate = {
  render: function () {
    return `
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <div class="table-responsive margin-bottom-2x">
          <table class="table margin-bottom-none">
            <thead>
              <tr>
                <th>Fecha de Consulta</th>
                <th>Ultima Actualizacion</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>08/08/2017</td>
                <td>14/08/2017</td>
                <td>Problemas en el Sitio Web</td>
                <td><span class="text-warning">Alto</span></td>
                <td><span class="text-primary">Abierto</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Messages-->
        <div class="comment">
          <div class="comment-author-ava"><img src="img/reviews/01.jpg" alt="Avatar"></div>
          <div class="comment-body">
            <p class="comment-text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.</p>
            <div class="comment-footer"><span class="comment-meta">Daniel Adams</span></div>
          </div>
        </div>
        <div class="comment">
          <div class="comment-author-ava"><img src="img/reviews/03.jpg" alt="Avatar"></div>
          <div class="comment-body">
            <p class="comment-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <div class="comment-footer"><span class="comment-meta">Jacob Hammond, Staff</span></div>
          </div>
        </div>
        <div class="comment">
          <div class="comment-author-ava"><img src="img/reviews/03.jpg" alt="Avatar"></div>
          <div class="comment-body">
            <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div class="comment-footer"><span class="comment-meta">Jacob Hammond, Staff</span></div>
          </div>
        </div>
        <!-- Reply Form-->
        <h5 class="mb-30 padding-top-1x">Nuevo Mensaje</h5>
        <form method="post">
          <div class="form-group">
            <textarea class="form-control form-control-rounded" id="review_text" rows="8" placeholder="Escriba su mensaje aquí..." required=""></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-outline-primary" type="submit">Enviar Mensaje</button>
            <button class="btn btn-outline-primary" type="button" onclick="reloadComunication(0)">Volver</button>
          </div>
        </form>
    `
  }
}



const ErrorComponent = {
  render: function () {
    return `
    <Selection>
        <h1>Error !!</h1>
    </Selection>
    `
  }
}