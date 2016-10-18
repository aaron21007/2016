/**
 * @api {post} /user/:id Enviar informacion a SEL
 * @apiName sendData
 * @apiGroup SEL
 *
 * @apiParam {Number} id Users unique ID.
 * @apiHeader {String} key Llave de acceso principal al servicio.
 * @apiHeader {String} client-id Id del cliente.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
