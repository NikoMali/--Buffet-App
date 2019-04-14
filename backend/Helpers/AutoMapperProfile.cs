using AutoMapper;
using BuffetApi.Dtos;
using BuffetApi.Entities;

namespace BuffetApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<Blog, BlogDto>();
            CreateMap<BlogDto, Blog>();
        }
    }
}