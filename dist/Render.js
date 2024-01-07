class Renderer {
    
    constructor(){
        this.weatherContainer = $("#weather-container");
        this.weatherTemplate = $("#weather-template");
    }
    render(container, handleTemplate, attribute){
        container.empty()
        const source = handleTemplate.html();
        const template = Handlebars.compile(source);
        const newHTML = template(attribute);
        container.append(newHTML)
    }
    renderWeather(weather){
        this.render(this.weatherContainer,this.weatherTemplate,weather)
    }
    
}