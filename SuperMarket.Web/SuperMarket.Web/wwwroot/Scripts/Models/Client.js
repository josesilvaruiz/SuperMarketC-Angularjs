﻿class Client extends User
{
        constructor(json)
        {
            super(json);

            if (json) {
                this.Name = json.name;
                this.Surname1 = json.surname1;
                this.Surname2 = json.surname2;
                this.Email = json.email;
                this.Password = json.password;
            }
            else {
                this.Name = "";
                this.Surname1 = "";
                this.Surname2 = "";
                this.Email = "";
                this.Password = "";
            }

        }
}