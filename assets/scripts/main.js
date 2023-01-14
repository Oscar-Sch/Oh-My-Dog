const { createApp } = Vue

createApp({
    data() {
        return {
            articulos:null,
            articulosFiltrados:null,
            // articulosFarmacia:null,
            // articulosJugueteria:null,
            errorCarga:false,
            valorBusqueda:"",
            valorSelector:"",
            listaCarrito:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
        .then(res=> res.json())
        .then(res=>{
            this.articulos=this.DetectarPagina(res);
            console.log(this.articulos)
            this.articulosFiltrados=this.articulos;
            if(localStorage.getItem("Carrito")){
                this.listaCarrito= JSON.parse(localStorage.getItem("Carrito"));
            }
        })
        .catch(err=> this.errorCarga=true);
    },
    methods:{
        DetectarPagina(datos){
            const titulo= document.querySelector("h1").innerText;
            if (titulo==="Farmacia"){
                return datos.filter(art=> art.categoria==="farmacia");
            }else
            if(titulo==="Jugueteria"){
                return datos.filter(art=> art.categoria==="jugueteria");
            }else{
                return datos;
            }
        },
        FiltrarBusqueda(){
            this.articulosFiltrados= this.articulos.filter(art=> art.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase()));

        },
        AgregarAlCarrito(arti){
            let index= this.listaCarrito.findIndex(prod.producto===arti.producto);
            if (index<0){
                arti.enCarrito=1;
                this.listaCarrito.push(arti);
            }else{
                this.listaCarrito[index].enCarrito++;
            }
            localStorage.setItem("Carrito", JSON.stringify(this.listaCarrito));
        },
        RestarAlCarrito(arti){
            let index= this.listaCarrito.findIndex(prod.producto===arti.producto);
            this.listaCarrito[index].enCarrito--;
            if(this.listaCarrito[index].enCarrito<=0){
                this.listaCarrito.splice(index,1);
            }
            localStorage.setItem("Carrito", JSON.stringify(this.listaCarrito));
        },
        OrdenarCartas(){
            if(this.valorSelector==="a-z"){
                this.articulosFiltrados.sort((a,b)=>{
                    if (a.pruducto>b.producto){
                        return 1;
                    }
                    if (a.producto<b.producto){
                        return -1;
                    }
                    return 0;
                })
            }
            if(this.valorSelector==="z-a"){
                this.articulosFiltrados.sort((a,b)=>{
                    if (a.pruducto>b.producto){
                        return -1;
                    }
                    if (a.producto<b.producto){
                        return 1;
                    }
                    return 0;
                })
            }
            if(this.valorSelector==="men-may"){
                this.articulosFiltrados.sort((a,b)=>{
                    if (a.precio>b.precio){
                        return 1;
                    }
                    if (a.precio<b.precio){
                        return -1;
                    }
                    return 0;
                })
            }
            if(this.valorSelector==="may-men"){
                this.articulosFiltrados.sort((a,b)=>{
                    if (a.precio>b.precio){
                        return -1;
                    }
                    if (a.precio<b.precio){
                        return 1;
                    }
                    return 0;
                })
            }
        }
    }
}).mount('#app')