

async function getImage(role, id) {
    let result;
    if (role === "teacher") {
        result = await Teacher.findAll({ where: { UserId: id } });
    }
    if (role === "student") {
        result = await Student.findAll({ where: { UserId: id } });
    }
    result = result[0].image;
    return result;
}

module.exports = getImage