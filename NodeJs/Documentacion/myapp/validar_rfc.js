/**
 * @api {post} validarRFCyProducto validarRFCyProducto
 * @apiName checkRFC
 * @apiGroup Formulario
 * @apiDescription Este metodo realiza una validación con la información que se tiene al momento para evitar duplicidad en las ventas.
 * @apiParam {String} rfc El RFC del cliente a consultar
 *
 * @apiSuccess (Parametros Respuesta Exitosa) {String} resp Codigo que contiene el tipo de respuesta
 * @apiSuccess (Parametros Respuesta Exitosa) {String} desc  Descripcion relacionada al codigo
 * @apiHeader {String} key Llave de acceso principal al servicio.
 * @apiHeader {String} client-id Id del cliente.
 *
 * @apiSuccessExample (Ejemplo) Respuesta Exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "resp": 200,
 *         "desc": "Adelante."
 *     }
 *
 * @apiError (Parametros Respuesta Erronea) {String} resp Codigo que contiene el tipo de respuesta
 * @apiError (Parametros Respuesta Erronea) {String} desc  Descripcion relacionada al codigo
 * @apiErrorExample (Ejemplo) Respuesta Error:
 *     HTTP/1.1 400 Not Found
 *     {
 *         "resp": 400,
 *         "desc": "Limite de Tarjetas alcanzado"
 *     }
 * @apiVersion 0.1.0
 */
