package com.rox.app.mirrors.web.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import com.rox.app.mirrors.core.entity.PostItem;
import com.rox.app.mirrors.core.repository.PostItemDao;
import com.rox.app.mirrors.web.util.persistence.DynamicSpecifications;
import com.rox.app.mirrors.web.util.persistence.SearchFilter;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


@Service
public class PostService {
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    PostItemDao postItemDao;

    @Autowired
    private EntityManager entityManager;

    /**
     * 根据页面输入的内容来加载问题记录基础表，定义检查问题及整改流程的基础信息信息列表
     *
     * @param searchParams 页面输入的查询条件
     * @param pageNumber   当前页码
     * @param pageSize     每页显示的数据条数
     * @return
     */

    public Page<PostItem> loadPostItemByCondition(Map<String, Object> searchParams, int pageNumber, int pageSize) {
        Query query =  this.entityManager.createQuery("Select i FROM PostItem i");
        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);

        List<PostItem> list = query.getResultList();
        PageRequest pageResult = new PageRequest(pageNumber - 1, pageSize);

        Number totalCnt = (Number)entityManager.createNativeQuery("select account from post_info").getSingleResult();
        entityManager.clear();
        return new PageImpl<PostItem>(list, pageResult, totalCnt.intValue());
    }

    public Page<PostItem> loadPostItemByAuthor(String author, int pageNumber, int pageSize) {
        Query query =  this.entityManager.createQuery("Select i FROM PostItem i where i.author = '" + author + "'");
        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);

        List<PostItem> list = query.getResultList();
        PageRequest pageResult = new PageRequest(pageNumber - 1, pageSize);

        Number totalCnt = (Number)entityManager.createNativeQuery("select count(*) from post_item where author = '" + author + "'").getSingleResult();
        entityManager.clear();
        return new PageImpl<PostItem>(list, pageResult, totalCnt.intValue());
    }

    @Transactional
    public void updatePostItemWithBlockAuthor(String username, int type) {
        Query query =  this.entityManager.createNativeQuery("UPDATE post_item set type = " + type + " WHERE author = '" + username + "'");

        query.executeUpdate();

        entityManager.flush();
        entityManager.clear();
    }
}
