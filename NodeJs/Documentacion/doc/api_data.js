define({ "api": [
  {
    "type": "post",
    "url": "validarRFCyProducto",
    "title": "validarRFCyProducto",
    "name": "checkRFC",
    "group": "Formulario",
    "description": "<p>Este metodo realiza una validación con la información que se tiene al momento para evitar duplicidad en las ventas.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rfc",
            "description": "<p>El RFC del cliente a consultar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Parametros Respuesta Exitosa": [
          {
            "group": "Parametros Respuesta Exitosa",
            "type": "String",
            "optional": false,
            "field": "resp",
            "description": "<p>Codigo que contiene el tipo de respuesta</p>"
          },
          {
            "group": "Parametros Respuesta Exitosa",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>Descripcion relacionada al codigo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "(Ejemplo) Respuesta Exitosa:",
          "content": "HTTP/1.1 200 OK\n{\n    \"resp\": 200,\n    \"desc\": \"Adelante.\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Llave de acceso principal al servicio.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client-id",
            "description": "<p>Id del cliente.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Parametros Respuesta Erronea": [
          {
            "group": "Parametros Respuesta Erronea",
            "type": "String",
            "optional": false,
            "field": "resp",
            "description": "<p>Codigo que contiene el tipo de respuesta</p>"
          },
          {
            "group": "Parametros Respuesta Erronea",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>Descripcion relacionada al codigo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "(Ejemplo) Respuesta Error:",
          "content": "HTTP/1.1 400 Not Found\n{\n    \"resp\": 400,\n    \"desc\": \"Limite de Tarjetas alcanzado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "myapp/validar_rfc.js",
    "groupTitle": "Formulario"
  },
  {
    "type": "post",
    "url": "validarNumeroVivo",
    "title": "validarNumeroVivo",
    "name": "validarNumeroVivo",
    "group": "Formulario",
    "description": "<p>Esta funcion se encarga de validar que el numero que se capture en el formulario corresponda al numero que esta en llamada</p>",
    "parameter": {
      "fields": {
        "Parametros Petición": [
          {
            "group": "Parametros Petición",
            "type": "Int",
            "optional": false,
            "field": "number",
            "description": "<p>Número a consultar dentro de la telefonia de Directo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Parametros Respuesta Exitosa": [
          {
            "group": "Parametros Respuesta Exitosa",
            "type": "String",
            "optional": false,
            "field": "resp",
            "description": "<p>Codigo que contiene el tipo de respuesta</p>"
          },
          {
            "group": "Parametros Respuesta Exitosa",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>Descripcion relacionada al codigo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "(Ejemplo) Respuesta Exitosa:",
          "content": "HTTP/1.1 200 OK\n{\n    \"resp\": 200,\n    \"desc\": \"El número corresponde a la llamada en curso.\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Llave de acceso principal al servicio.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client-id",
            "description": "<p>Id del cliente.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Parametros Respuesta Erronea": [
          {
            "group": "Parametros Respuesta Erronea",
            "type": "String",
            "optional": false,
            "field": "resp",
            "description": "<p>Codigo que contiene el tipo de respuesta</p>"
          },
          {
            "group": "Parametros Respuesta Erronea",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>Descripcion relacionada al codigo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "(Ejemplo) Respuesta Error:",
          "content": "HTTP/1.1 400 Not Found\n{\n    \"resp\": 400,\n    \"desc\": \"El número corresponde a la llamada en curso.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "myapp/numero_curso.js",
    "groupTitle": "Formulario"
  },
  {
    "type": "post",
    "url": "/user/:id",
    "title": "Enviar informacion a SEL",
    "name": "sendData",
    "group": "SEL",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Llave de acceso principal al servicio.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client-id",
            "description": "<p>Id del cliente.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/insertar_data_sel.js",
    "groupTitle": "SEL"
  }
] });
