import handler from "../pages/api/api";

export async function Numeros (){
    handler.map(async(Numero, idx) => {
        await setTimeout(() => {}, 1000);
        return (
            <ListGroup horizontal='xxl' className="my-2" key={idx}>
            <ListGroup.Item>{Numero.NUMEROSORTEIO}<br/>ticket</ListGroup.Item>
            </ListGroup>
        )
        })
    
}