export default function validateInfo(values){
    let errors = {}
    
    
    if(!values.complete_name.trim()){
        errors.complete_name = "Se requiere nombre completo!"
    }

    if(!values.document.trim()){
        errors.document = "Se requiere numero de documento!"
    }

    if(!values.age.trim()){
        errors.age = "Se requiere edad!"
    }

    if(!values.gender.trim()){
        errors.gender = "Especifique género"
    }

    if(!values.note.trim()){
        errors.note = "Ingrese la nota"
    }else if(values.note<0 || values.note>5){
        errors.note = "La nota debe estar entre 0 y 5"
    }

    if(!values.autoevaluation.trim()){
        errors.autoevaluation = "Ingrese la nota"
    }else if(values.autoevaluation<0 || values.autoevaluation>5){
        errors.autoevaluation = "La nota debe estar entre 0 y 5"
    }
    return errors;
}