const formConstants = {
    form: [
        {   
            name: "header",
            title: "Basic Information",
            type: "header",
            key: "example-header"
        },
        {   
            name: "firstname",
            title: "First Name",
            type: "textfield",
            key: "example-textfield",
        },
        {   
            name: "lastname", 
            title: "Last Name",
            type: "textfield",
            key: "example-textfield2",
        },
        {   
            name: "phonenumber",
            title: "Phone Number",
            type: "textfield",
            key: "example-textfield3",
        },
        {   
            name: "email",
            title: "Email",
            type: "textfield",
            key: "example-textfield4",
        },
        {   
            name:  "volunteer",
            title: "Volunteer",
            type: "select",
            key: "example-select",
        }
    ],
    volunteers: [
        {
            name: "michael",
            key: 1
        },
        {
            name: "bob",
            key: 2
        }
    ]
}

export default formConstants