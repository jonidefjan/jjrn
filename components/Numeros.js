import React, {Component} from 'react';

var data = [];

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "jjrn.app.br",
  user: "jjrnap02_admin",
  password: "Def@55243862",
  database: "jjrnap02_DUZZI"
});

con.connect((err) => {
  if (err) {
      console.log('Erro connecting to database...', err)
      return
  }
  console.log('Connection established!')
})

con.end((err) => {
  if(err) {
      console.log('Erro to finish connection...', err)
      return 
  }
  console.log('The connection was finish...')
})

con.query('SELECT * FROM TJD_MAIN', (err, rows) => {
    if (err) throw err

    data = rows;
})

class Numeros extends Component {
    

    render(){
        
        return (
            <div className="galeria">
                <ul className="grid">
                {data.map((numero) => {
                    
                    return (
                        <Link 
                            to={"/products/"+numero.}  
                            key={numero.id}
                        >
                            <li>
                                <figure className="grid__figure">
                                <img src={numero.capa} alt={numero.titulo}/>
                                <figcaption className="grid_description">
                                    <p>{numero.titulo}</p>
                                    <p>{numero.autor}</p>
                                    <p>R$: {numero.preco}</p>
                                </figcaption>
                                </figure>
                            </li>
                        </Link >
                    )
                })} 
                </ul>
            </div>
        )
    }
    
}

export default Numeros