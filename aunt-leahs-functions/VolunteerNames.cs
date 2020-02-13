using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Text;

namespace Alp.Functions
{
    public static class VolunteerNames
    {
        [FunctionName("VolunteerNames")]
        public static string Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req, ILogger log)
        {
            var connectionString = Environment.GetEnvironmentVariable("sqldb_connection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("SELECT [volunteer_id], [first_name], [last_name] ");
                sb.Append("FROM [dbo].[volunteers]");
                sb.Append("FOR JSON AUTO");
                string queryString = sb.ToString();

                SqlCommand command = new SqlCommand(queryString, connection);

                connection.Open();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    reader.Read();
                    String volunteerNames = (String) reader[0];
                    return volunteerNames;
                }
            }
        }
    }
}
