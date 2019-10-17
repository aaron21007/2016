cube(`Transacciones`, {
  sql: `SELECT * FROM sms.`Transacciones``,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [uuid, id, xMessageId, date]
    }
  },
  
  dimensions: {
    completeMessage: {
      sql: `complete_message`,
      type: `string`
    },
    
    uuid: {
      sql: `uuid`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    xMessageId: {
      sql: `x_message_id`,
      type: `string`
    },
    
    operador: {
      sql: `operador`,
      type: `string`
    },
    
    ciudad: {
      sql: `ciudad`,
      type: `string`
    },
    
    municipio: {
      sql: `municipio`,
      type: `string`
    },
    
    logEvent: {
      sql: `log_event`,
      type: `string`
    },
    
    dataRow: {
      sql: `data_row`,
      type: `string`
    },
    
    urlWs: {
      sql: `url_ws`,
      type: `string`
    },
    
    tokenWs: {
      sql: `token_ws`,
      type: `string`
    },
    
    date: {
      sql: `date`,
      type: `time`
    }
  }
});
