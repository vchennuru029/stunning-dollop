function skillsMember(){
    var member = {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        address: {
            city: 'New York',
            country: 'USA'
        },
        getSkills: function(){
            return this.skills;
        }
    };
    
    return member;
}