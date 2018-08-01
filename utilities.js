module.exports = {
    isModerator: function(member) {
        return member.roles.some(r => ["Staff"]).includes(r.name)
    }
};





