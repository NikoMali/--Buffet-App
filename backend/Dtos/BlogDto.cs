namespace BuffetApi.Dtos
{
    public class BlogDto
    {  
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDesc { get; set; }
        public string LongDesc { get; set; }
        public string ImgUrl { get; set; }
        public int LangId { get; set; }
        public int OriginalPostId { get; set; }
        public string CreateDate { get; set; }
    }
}