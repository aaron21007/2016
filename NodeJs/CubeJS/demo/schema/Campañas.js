cube(`Campañas`, {
  sql: `SELECT * FROM sms.`Campañas``,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [idate, name, id, idsBlacklist, initDate, finishDate]
    },
    
    wsNumber: {
      sql: `ws_number`,
      type: `sum`
    }
  },
  
  dimensions: {
    numberColum: {
      sql: `number_colum`,
      type: `string`
    },
    
    idate: {
      sql: `idate`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    columnas: {
      sql: `columnas`,
      type: `string`
    },
    
    pathCsv: {
      sql: `path_csv`,
      type: `string`
    },
    
    message: {
      sql: `message`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    idsBlacklist: {
      sql: `ids_blacklist`,
      type: `string`
    },
    
    specialColumn: {
      sql: `special_column`,
      type: `string`
    },
    
    wsMessage: {
      sql: `ws_message`,
      type: `string`
    },
    
    type: {
      sql: `type`,
      type: `string`
    },
    
    initDate: {
      sql: `init_date`,
      type: `time`
    },
    
    finishDate: {
      sql: `finish_date`,
      type: `time`
    }
  }
});
