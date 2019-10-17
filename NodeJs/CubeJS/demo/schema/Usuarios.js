cube(`Usuarios`, {
  sql: `SELECT * FROM sms.`Usuarios``,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [username, completeName, id, idate]
    },
    
    price: {
      sql: `price`,
      type: `sum`
    }
  },
  
  dimensions: {
    image: {
      sql: `image`,
      type: `string`
    },
    
    password: {
      sql: `password`,
      type: `string`
    },
    
    email: {
      sql: `email`,
      type: `string`
    },
    
    username: {
      sql: `username`,
      type: `string`
    },
    
    completeName: {
      sql: `complete_name`,
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
    
    pathFiles: {
      sql: `path_files`,
      type: `string`
    },
    
    pathImages: {
      sql: `path_images`,
      type: `string`
    },
    
    type: {
      sql: `type`,
      type: `string`
    },
    
    mascaras: {
      sql: `mascaras`,
      type: `string`
    },
    
    idate: {
      sql: `idate`,
      type: `time`
    }
  }
});
