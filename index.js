const express = require("express")
const port = 3000
const uuid = require("uuid")

const app = express()
app.use(express.json())

const orders = []

const checkClientId = (request, response, next)=> {
    const {id} = request.params

    const index = orders.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: "Order not found"})
    }

    request.clientIndex = index

    request.clientId = id

    next()
}


app.get("/orders", (request, response)=> {

    console.log(request.method + request.url)
    
    return response.json(orders)
})


app.get("/orders/:id", checkClientId, (request, response)=> {
    const index = request.clientIndex

    console.log(request.method + request.url)

    return response.json(orders[index])
})


app.post("/orders", (request, response)=> {
    const {order, clientName, price} = request.body
    const status = "Em preparação"

    const completeOrder = {id:uuid.v4(), order, clientName, price, status}

    orders.push(completeOrder)

    console.log(request.method + request.url)

    return response.status(201).json(completeOrder)
})


app.put("/orders/:id", checkClientId, (request, response)=> {
    const {order, clientName, price} = request.body
    const index = request.clientIndex
    const id = request.clientId
    const status = "Em preparação"

    const updatedOrder = {id: id, order, clientName, price, status}

    orders[index] = updatedOrder

    console.log(request.method + request.url)

    return response.json(updatedOrder)
})


app.delete("/orders/:id", checkClientId, (request, response)=> {
    const index = request.clientIndex

    orders.splice(index, 1)

    console.log(request.method + request.url)

    return response.json({message: "Order successfully deleted"})
})


app.patch("/orders/:id", checkClientId, (request, response)=> {
    const {order, clientName, price} = request.body
    const index = request.clientIndex
    const id = request.clientId
    const status = "Pronto"
    
    const orderReady = {id: id, order, clientName, price, status}

    orders[index] = orderReady

    console.log(request.method + request.url)

    return response.json(orderReady)
})


app.listen(port, ()=> {
    console.log(`🚀 Server started on port ${port}`)
})