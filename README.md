# Cheesecake-react
This project is a work in progress.

## Installing and Running

First clone the repository.

Then run the following two commands in the `Cheesecake-react\Cheesecake-react.Data>` folder
 
 `dotnet ef migrations add {SomeMigration}`
and then `dotnet ef database update`.

Then go to the `Cheesecake-react.Web/appsettings.json` file
and change the Data Source to your SQL server name.

Then on the command line you can go to the web project folder `Cheesecake-react.Web/`
and run `dotnet watch run` 

**PLEASE NOTE:** THIS PROJECT IS INCOMPLETE, IF YOU CHOOSE TO INSTALL AND RUN THERE WILL BE BUGS!
