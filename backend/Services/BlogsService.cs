using System;
using System.Collections.Generic;
using System.Linq;
using BuffetApi.Entities;
using BuffetApi.Helpers;

namespace BuffetApi.Services
{
    public interface IBlogsService
    {
        IEnumerable<Blog> GetAll();
        Blog GetById(int id);
        Blog Create(Blog blog);
        // void Update(User user, string password = null);
        // void Delete(int id);
    }

    public class BlogsService : IBlogsService
    {
        private DataContext _context;

        public BlogsService(DataContext context)
        {
            _context = context;
        }


        public IEnumerable<Blog> GetAll()
        {
            return _context.Blogs;
        }

        public Blog GetById(int id)
        {
            return _context.Blogs.Find(id);
        }

        public Blog Create(Blog blog)
        {
            
            _context.Blogs.Add(blog);
            _context.SaveChanges();
            return blog;
        }

        // public void Update(User userParam, string password = null)
        // {
            
        // }

        // public void Delete(int id)
        // {
            
        // }

    }
}