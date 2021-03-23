export function handleResponse(r, reqType) {
    let msg = reqType
    if(r.status === 200) {
        msg += " avec succès !"
    } else if(r.status === 201) {
        msg += " avec succès !"
    }

    alert(msg)
}
