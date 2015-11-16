using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;

namespace Calendar.Providers
{
	public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
	{
		public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
		{
			context.Validated();
		}

		public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
		{

			context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

			Models.User user;
			using (var db = new Models.CalendarContext())
			{
				user = db.Users.SingleOrDefault(u => u.PhoneNumber == context.UserName);

				if (user == null)
				{
					context.SetError("invalid_grant", "username");
					return;
				}

				if (!Crypto.VerifyHashedPassword(user.Password, context.Password))
				{
					context.SetError("invalid_grant", "password");
					return;
				}
			}

			var identity = new ClaimsIdentity(context.Options.AuthenticationType);
			identity.AddClaim(new Claim(ClaimTypes.Name, user.Id.ToString()));
			identity.AddClaim(new Claim(ClaimTypes.Role, "user"));

			context.Validated(identity);

		}
	}
}