import '../assets/styles/footer.styl'

export default {
    data(){
        return{
            author:'Joe'
        }
    },
    render(){
        return(
            <div id="footer">
                <span>Witten by {this.author}</span>
            </div>
        )
    }
}