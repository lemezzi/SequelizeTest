const { Sequelize, DataTypes } = require('sequelize');

// Connection de sequelize avec la base de donne postgreSQL
const sequelize = new Sequelize('mezzi', 'postgres', 'mezzi', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false 
});

//une sorte de creation de schema avec mongodb (la creation de la forme du tableau(objet))
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

async function run() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');


    //Pour la creation d'un user
    const newUser = await User.create({ name: 'Mezzi', age: 24 });
    console.log('User created:', newUser.toJSON());
   //Pour recuperer tous les users
    const users = await User.findAll();
    console.log('All users:', users.map(user => user.toJSON()));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

run();
