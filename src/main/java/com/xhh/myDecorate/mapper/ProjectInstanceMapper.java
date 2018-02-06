package com.xhh.myDecorate.mapper;

import com.xhh.myDecorate.dao.ProjectInstance;
import com.xhh.myDecorate.mapper.provider.ProjectInstanceProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Repository;

/**
 * @author xuhaihong
 * @create 2018-02-02 11:00
 **/
@Mapper
@Repository
public interface ProjectInstanceMapper {

    @SelectProvider(type = ProjectInstanceProvider.class, method = "save")
    void save(ProjectInstance instance);
}