namespace Calendar.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserCityEmail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "City", c => c.String());
            AddColumn("dbo.Users", "Email", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Email");
            DropColumn("dbo.Users", "City");
        }
    }
}
