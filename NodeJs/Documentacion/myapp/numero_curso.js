/**
 * @api {post} validarNumeroVivo validarNumeroVivo
 * @apiName validarNumeroVivo
 * @apiGroup Formulario
 * @apiDescription Esta funcion se encarga de validar que el numero que se capture en el formulario corresponda al numero que esta en llamada
 * @apiParam (Parametros Petición) {Int} number Número a consultar dentro de la telefonia de Directo.
 *
 * @apiSuccess (Parametros Respuesta Exitosa) {String} resp Codigo que contiene el tipo de respuesta
 * @apiSuccess (Parametros Respuesta Exitosa) {String} desc  Descripcion relacionada al codigo
 *
 * @apiHeader {String} key Llave de acceso principal al servicio.
 * @apiHeader {String} client-id Id del cliente.
 *
 * @apiSuccessExample (Ejemplo) Respuesta Exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "resp": 200,
 *         "desc": "El número corresponde a la llamada en curso."
 *     }
 *
 * @apiError (Parametros Respuesta Erronea) {String} resp Codigo que contiene el tipo de respuesta
 * @apiError (Parametros Respuesta Erronea) {String} desc  Descripcion relacionada al codigo
 * @apiErrorExample (Ejemplo) Respuesta Error:
 *     HTTP/1.1 400 Not Found
 *     {
 *         "resp": 400,
 *         "desc": "El número corresponde a la llamada en curso."
 *     }
 * @apiVersion 0.1.0
 */
