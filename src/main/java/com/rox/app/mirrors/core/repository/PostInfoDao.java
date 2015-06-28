/*/////////////////////////////////////////////////////////////////////////
 * Copyright (C) 2015 太昌电子
 *
 *
 * 改版历史：
 * 2015年5月25日：lixu create this file and upload to SVN.
 *//////////////////////////////////////////////////////////////////////////
package com.rox.app.mirrors.core.repository;


import com.rox.app.mirrors.core.entity.PostInfo;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


/**
 */
public interface PostInfoDao extends PagingAndSortingRepository<PostInfo, Integer>, JpaSpecificationExecutor<PostInfo> {
    public PostInfo getPostInfoByTitle(String title);
}
