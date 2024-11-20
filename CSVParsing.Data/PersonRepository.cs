namespace CSVParsing.Data
{
    public class PersonRepository
    {
        private string _connectionString;
        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddPeopleToDb(List<Person> ppl)
        {
            using var context = new PersonDbContext(_connectionString);
            foreach(var p in ppl)
            {
                context.People.Add(p);
            }
            context.SaveChanges();
        }
        public List<Person> GetPeople()
        {
            using var context = new PersonDbContext(_connectionString);
            var ppl =  context.People.ToList();
            if(ppl.Count>0)
            {
                return ppl;
            }
            return null;
        }
        public void DeleteAll()
        {
            using var context = new PersonDbContext(_connectionString);
            context.People.RemoveRange(context.People);
            context.SaveChanges();
        }
    }
}