using CsvHelper;
using CSVParsing.Data;
using CSVParsing.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Buffers.Text;
using System.Globalization;
using System.Text;

namespace CSVParsing.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleUploadController : ControllerBase
    {
        private string _connectionString;
        public PeopleUploadController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("generate")]
        public void Generate(int amount)
        {
            var ppl = Enumerable.Range(1, amount).Select(_ => new Person
            {
                FirstName = Faker.Name.First(),
                LastName = Faker.Name.Last(),
                Age = Faker.RandomNumber.Next(1, 100),
                Address = Faker.Address.StreetAddress(),
                Email = Faker.Internet.Email()
            }).ToList();
            var csv = BuildPeopleCsv(ppl);
            UploadCsvString(csv);
        }

        [HttpGet]
        [Route("getFile")]
        public IActionResult GetFile()
        {
            byte[] csvData = System.IO.File.ReadAllBytes($"uploads/people.csv");
            return File(csvData, "text/csv", "people.csv");
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModel vm)
        {
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] fileBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"uploads/{vm.Name}", fileBytes);
            var csv = System.IO.File.ReadAllText($"uploads/{vm.Name}");
            var ppl = ReadPeopleFromCsv(csv);
            var repo = new PersonRepository(_connectionString);
            repo.AddPeopleToDb(ppl);
        }

        [HttpGet]
        [Route("getPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetPeople();
        }
        [HttpPost]
        [Route("deleteAll")]
        public void DeleteAll()
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAll();
        }

        //[HttpPost]
        //[Route("sendToDb")]
        //public void SendToDb(string name)
        //{
        //    var csv = System.IO.File.ReadAllText($"uploads/{name}");
        //    var ppl = ReadPeopleFromCsv(csv);
        //    var repo = new PersonRepository(_connectionString);
        //    repo.AddPeopleToDb(ppl);
        //}

        private List<Person> ReadPeopleFromCsv(string csv)
        {
            var stringReader = new StringReader(csv);
            using var csvReader = new CsvReader(stringReader, CultureInfo.InvariantCulture);
            return csvReader.GetRecords<Person>().ToList();
        }

        private string BuildPeopleCsv(List<Person> ppl)
        {
            var builder = new StringBuilder();
            var stringWriter = new StringWriter(builder);
            var csv = new CsvWriter(stringWriter, CultureInfo.InvariantCulture);
            csv.WriteRecords(ppl);
            return builder.ToString();
        }
        private void UploadCsvString(string csv)
        {
            byte[] csvBytes = Encoding.UTF8.GetBytes(csv);
            System.IO.File.WriteAllBytes($"uploads/people.csv", csvBytes);
        }


    }


}
