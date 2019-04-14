using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using BuffetApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using BuffetApi.Services;
using BuffetApi.Dtos;
using BuffetApi.Entities;

namespace BuffetApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BlogsController : ControllerBase
    {
        private IBlogsService _blogsService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public BlogsController(
            IBlogsService blogsService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _blogsService = blogsService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]BlogDto blogDto)
        {
            var blog = _mapper.Map<Blog>(blogDto);

            try 
            {
                _blogsService.Create(blog);
                return Ok();
            } 
            catch(AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var Blogs =  _blogsService.GetAll();
            var blogDtos = _mapper.Map<IList<BlogDto>>(Blogs);
            return Ok(blogDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user =  _blogsService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, [FromBody]UserDto userDto)
        // {
        //     // map dto to entity and set id
        //     var user = _mapper.Map<User>(userDto);
        //     user.Id = id;

        //     try 
        //     {
        //         // save 
        //         _blogsService.Update(user, userDto.Password);
        //         return Ok();
        //     } 
        //     catch(AppException ex)
        //     {
        //         // return error message if there was an exception
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

        // [HttpDelete("{id}")]
        // public IActionResult Delete(int id)
        // {
        //     _blogsService.Delete(id);
        //     return Ok();
        // }
    }
}
